import { state, setters, getters } from "remx";

import { Article, Profile } from "../types";

type ArticlesState = {
  articles: ReadonlyArray<Article>;
  openArticle: Readonly<Article> | undefined;
};

const initialArticlesState = {
  articles: [],
  openArticle: undefined,
};

const articlesState = state<ArticlesState>(initialArticlesState);

const articlesSetters = setters({
  setArticles(articles: ReadonlyArray<Article>) {
    articlesState.articles = articles;
  },
  updateArticle(article: Article) {
    if (article.slug === articlesState.openArticle?.slug) {
      articlesState.openArticle = article;
    }

    const articleIndex = articlesState.articles.findIndex(
      ({ slug }) => slug === article.slug
    );

    if (articleIndex !== undefined) {
      const articles = [...articlesState.articles];
      articles[articleIndex] = article;
      articlesState.articles = articles;
    }
  },
  updateAuthors(author: Profile) {
    if (author.username === articlesState.openArticle?.author.username) {
      articlesState.openArticle = {
        ...articlesState.openArticle,
        author,
      };
    }

    const articles = [...articlesState.articles];
    articles.map((article) => {
      if (author.username === article.author.username) {
        return {
          ...article,
          author,
        };
      }

      return article;
    });

    articlesState.articles = articles;
  },
  setOpenArticle(article: Article | undefined) {
    articlesState.openArticle = article;
  },
});

const articlesGetters = getters({
  getArticles() {
    return articlesState.articles;
  },
  getOpenArticle() {
    return articlesState.openArticle;
  },
});

export const articlesStore = {
  ...articlesSetters,
  ...articlesGetters,
};
