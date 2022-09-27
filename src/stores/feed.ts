import { state, setters, getters } from "remx";

export const enum FeedType {
  Your,
  Global,
  Tag,
}

type FeedState = {
  feeds: ReadonlyArray<FeedType>;
  activeFeed: FeedType | undefined;
};

const initialFeedState = {
  feeds: [FeedType.Your, FeedType.Global, FeedType.Tag],
  activeFeed: undefined,
};

const feedState = state<FeedState>(initialFeedState);

const feedSetters = setters({
  setActiveFeed(feed: FeedType) {
    feedState.activeFeed = feed;
  },
});

const feedGetters = getters({
  getFeeds() {
    return feedState.feeds;
  },
  getActiveFeed() {
    return feedState.activeFeed;
  },
});

export const feedStore = {
  ...feedSetters,
  ...feedGetters,
};
