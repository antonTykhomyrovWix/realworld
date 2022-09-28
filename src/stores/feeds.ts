import { state, setters, getters } from "remx";

import { Feed, FeedType } from "../types";

type FeedState = {
  feeds: ReadonlyArray<Feed>;
  activeFeed: Feed | undefined;
};

const initialFeedsState = {
  feeds: [
    {
      type: FeedType.Your,
    },
    {
      type: FeedType.Global,
    },
    {
      type: FeedType.Tag,
    },
  ],
  activeFeed: undefined,
};

const feedsState = state<FeedState>(initialFeedsState);

const feedsSetters = setters({
  setActiveFeed(feed: Feed) {
    feedsState.activeFeed = feed;
  },
});

const feedsGetters = getters({
  getFeeds() {
    return feedsState.feeds;
  },
  getActiveFeed() {
    return feedsState.activeFeed;
  },
});

export const feedsStore = {
  ...feedsSetters,
  ...feedsGetters,
};
