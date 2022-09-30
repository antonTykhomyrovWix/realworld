import { state, setters, getters } from "remx";

import { Article, Profile } from "../types";

type ArticlesState = {
  homeArticles: ReadonlyArray<Article>;
  profileArticles: ReadonlyArray<Article>;
  openArticle: Article | undefined;
};

const initialArticlesState = {
  homeArticles: [],
  profileArticles: [],
  openArticle: undefined,
};

const articlesState = state<ArticlesState>(initialArticlesState);

const articlesSetters = setters({
  setHomeArticles(articles: ReadonlyArray<Article>) {
    articlesState.homeArticles = articles;
  },

  setProfileArticles(articles: ReadonlyArray<Article>) {
    articlesState.profileArticles = articles;
  },

  updateArticle(article: Article) {
    if (article.slug === articlesState.openArticle?.slug) {
      articlesState.openArticle = article;
    }

    articlesState.homeArticles = [...articlesState.homeArticles].map(
      (homeArticle: Article) =>
        homeArticle.slug === article.slug ? article : homeArticle
    );

    articlesState.profileArticles = [...articlesState.profileArticles].map(
      (profileArticle: Article) =>
        profileArticle.slug === article.slug ? article : profileArticle
    );
  },

  updateAuthors(author: Profile) {
    if (author.username === articlesState.openArticle?.author.username) {
      articlesState.openArticle = {
        ...articlesState.openArticle,
        author,
      };
    }
  },

  deleteArticle(slug: string) {
    if (slug === articlesState.openArticle?.slug) {
      articlesState.openArticle = undefined;
    }

    articlesState.homeArticles = [...articlesState.homeArticles].filter(
      (article: Article) => article.slug !== slug
    );

    articlesState.profileArticles = [...articlesState.profileArticles].filter(
      (article: Article) => article.slug !== slug
    );
  },

  setOpenArticle(article: Article | undefined) {
    articlesState.openArticle = article;
  },
});

const articlesGetters = getters({
  getHomeArticles() {
    return articlesState.homeArticles;
  },

  getProfileArticles() {
    return articlesState.profileArticles;
  },

  getOpenArticle(): { article?: Article } {
    return {
      article: articlesState.openArticle,
    };
  },
});

export const articlesStore = {
  ...articlesSetters,
  ...articlesGetters,
};
