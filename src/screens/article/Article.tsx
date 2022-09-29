import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useConnect } from "remx";

import { commonStyles } from "../../style-sheets";
import { RootStackParamList, screenName } from "../../navigation";
import { articlesService, commentsService } from "../../services";
import { Article as ArticleType, Comment, User } from "../../types";
import { articlesStore, userStore } from "../../stores";
import { ArticleMetaInfo } from "../../components/article-meta-info";
import { TagsList } from "../../components/tags-list";
import { Comments } from "../../components/comments";

type ArticleProps = NativeStackScreenProps<
  RootStackParamList,
  screenName.article
>;

export function Article({ route, navigation }: ArticleProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<
    ReadonlyArray<Comment> | undefined
  >();
  // TODO:useConnect type error
  // @ts-ignore
  const article = useConnect<ArticleType | undefined, []>(
    articlesStore.getOpenArticle
  );
  // @ts-ignore
  const currentUser = useConnect<User | undefined, []>(
    userStore.getCurrentUser
  );

  const goToSignIn = useCallback(
    () => navigation.navigate(screenName.signIn),
    [navigation]
  );

  const goToProfile = useCallback(
    (username: string) => navigation.navigate(screenName.profile, { username }),
    [navigation]
  );

  useEffect(() => {
    const fetchArticleData = async () => {
      setLoading(true);

      const articleSlug = route.params.articleSlug;
      const [fetchedArticle, fetchedComments] = await Promise.all([
        articlesService.getArticle(articleSlug),
        commentsService.getComments(articleSlug),
      ]);

      articlesStore.setOpenArticle(fetchedArticle);
      setComments(fetchedComments);
      setLoading(false);
    };

    fetchArticleData();
  }, [route.params.articleSlug, currentUser]);

  const postComment = useCallback(
    async (comment: string) => {
      const newComment = await commentsService.postComment(
        route.params.articleSlug,
        comment
      );

      if (!newComment) {
        return;
      }

      setComments([newComment, ...(comments ?? [])]);
    },
    [route.params.articleSlug, comments]
  );

  if (loading || !article || !comments) {
    return (
      <View style={commonStyles.flexCenter}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={[styles.paddingBlock, styles.headerContainer]}>
        <Text style={styles.title}>{article.title}</Text>
        <ArticleMetaInfo
          article={article}
          withFollowUser={true}
          goToSignIn={goToSignIn}
          goToProfile={goToProfile}
        />
      </View>
      <View style={styles.paddingBlock}>
        <Text>{article.body}</Text>
      </View>
      <View style={[styles.paddingBlock, styles.tagsContainer]}>
        <TagsList tags={article.tagList} />
      </View>

      <View style={styles.paddingBlock}>
        <Comments
          comments={comments}
          postComment={postComment}
          goToProfile={goToProfile}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  paddingBlock: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  headerContainer: {
    backgroundColor: "#333",
  },
  title: {
    marginBottom: 12,
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  tagsContainer: {
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    borderBottomColor: "#aaa",
  },
});
