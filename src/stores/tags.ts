import { state, setters, getters } from "remx";

import { Tag } from "../types/tags";

type TagsState = {
  loading: boolean;
  tags: ReadonlyArray<Tag>;
  activeTag: Tag | undefined;
};

const initialTagsState = {
  loading: false,
  tags: [],
  activeTag: undefined,
};

const tagsState = state<TagsState>(initialTagsState);

const tagsSetters = setters({
  setLoading(loading: boolean) {
    tagsState.loading = loading;
  },
  setTags(tags: ReadonlyArray<Tag>) {
    tagsState.tags = tags;
  },
  setActiveTag(tag: Tag | undefined) {
    tagsState.activeTag = tag;
  },
});

const tagsGetters = getters({
  getLoading() {
    return tagsState.loading;
  },
  getTags() {
    return tagsState.tags;
  },
  getActiveTag() {
    return tagsState.activeTag;
  },
});

export const tagsStore = {
  ...tagsSetters,
  ...tagsGetters,
};
