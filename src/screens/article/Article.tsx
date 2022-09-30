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
import { RootStackParamList, ScreenName } from "../../navigation";
import { articlesService, commentsService } from "../../services";
import { articlesStore, commentsStore, userStore } from "../../stores";
import { ArticleMetaInfo } from "../../components/article-meta-info";
import { TagsList } from "../../components/tags-list";
import { Comments } from "../../components/comments";

type ArticleProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenName.Article
>;

export function Article({ route }: ArticleProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const comments = useConnect(commentsStore.getComments);
  const { article } = useConnect(articlesStore.getOpenArticle);
  const { currentUser } = useConnect(userStore.getCurrentUser);

  useEffect(() => {
    const fetchArticleData = async () => {
      setLoading(true);

      const articleSlug = route.params.articleSlug;
      const [fetchedArticle, fetchedComments] = await Promise.all([
        articlesService.getArticle(articleSlug),
        commentsService.getComments(articleSlug),
      ]);

      articlesStore.setOpenArticle(fetchedArticle);
      commentsStore.setComments(fetchedComments ?? []);
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

      commentsStore.addComment(newComment);
    },
    [route.params.articleSlug]
  );

  if (loading || !article) {
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
        <ArticleMetaInfo article={article} showActions={true} />
      </View>
      <View style={styles.paddingBlock}>
        <Text>{article.body}</Text>
      </View>
      <View style={[styles.paddingBlock, styles.tagsContainer]}>
        <TagsList tags={article.tagList} />
      </View>

      <View style={styles.paddingBlock}>
        {comments && <Comments comments={comments} postComment={postComment} />}
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
