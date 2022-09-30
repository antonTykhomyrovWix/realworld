import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation, StackActions } from "@react-navigation/native";

import { commonStyles } from "../../style-sheets";
import {
  NavigationPropRootStack,
  RootStackParamList,
  ScreenName,
} from "../../navigation";
import { articlesService } from "../../services";
import { inputsMaxLength, InputsType } from "../../utils";

type ArticleProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenName.ArticleForm
>;

export function ArticleForm({ route }: ArticleProps) {
  const isNewArticle = route.params.articleSlug === undefined;
  const navigation = useNavigation<NavigationPropRootStack>();
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [error, setErrors] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!route.params.articleSlug) {
        // form for new article, no need to fill inputs
        return;
      }

      setLoading(true);
      const article = await articlesService.getArticle(
        route.params.articleSlug
      );

      if (article) {
        setTitle(article.title);
        setDescription(article.description);
        setBody(article.body);
        setTags(article.tagList.join(" "));
      }

      setLoading(false);
    };

    fetchArticle();
  }, [route.params.articleSlug]);

  const validateForm = useCallback((): boolean => {
    if (!title) {
      setErrors("Title can't be blank");
      return false;
    }
    if (!description) {
      setErrors("Description can't be blank");
      return false;
    }
    if (!body) {
      setErrors("Body is not valid");
      return false;
    }

    return true;
  }, [title, description, body]);

  const getArticleForm = useCallback(() => {
    const form = {
      title,
      description,
      body,
    };

    return isNewArticle
      ? {
          ...form,
          tagList: tags.split(" "),
        }
      : form;
  }, [body, description, isNewArticle, tags, title]);

  const onSubmit = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    const form = getArticleForm();
    const article = isNewArticle
      ? await articlesService.createArticle(form)
      : await articlesService.updateArticle(route.params.articleSlug, form);

    if (article) {
      navigation.dispatch(
        StackActions.replace(ScreenName.Article, {
          articleSlug: article.slug,
        })
      );
    }
  }, [
    navigation,
    getArticleForm,
    validateForm,
    route.params.articleSlug,
    isNewArticle,
  ]);

  if (loading) {
    return (
      <View style={commonStyles.flexCenter}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={commonStyles.flexCenter}>
      {error && <Text style={commonStyles.error}>{error}</Text>}
      <TextInput
        style={commonStyles.input}
        placeholder="Article Title"
        onChangeText={setTitle}
        value={title}
        maxLength={inputsMaxLength[InputsType.ArticleTitle]}
      />
      <TextInput
        style={commonStyles.input}
        placeholder="What's this article about?"
        onChangeText={setDescription}
        value={description}
        maxLength={inputsMaxLength[InputsType.ArticleDescription]}
      />
      <TextInput
        style={[commonStyles.input, styles.bodyInput]}
        multiline={true}
        placeholder="Write your article (in markdown)"
        onChangeText={setBody}
        value={body}
        maxLength={inputsMaxLength[InputsType.ArticleBody]}
      />
      {isNewArticle && (
        <TextInput
          style={commonStyles.input}
          placeholder="Enter tags"
          onChangeText={setTags}
          value={tags}
          maxLength={inputsMaxLength[InputsType.ArticleTags]}
        />
      )}
      <Button
        color="#5CB85C"
        disabled={saving}
        title={isNewArticle ? "Create Article" : "Update Article"}
        onPress={onSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bodyInput: {
    height: 120,
  },
});
