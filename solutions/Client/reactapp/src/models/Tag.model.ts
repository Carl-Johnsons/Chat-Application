export type BaseTag = {
  id: string;
  value: string;
};

export type Tag = BaseTag & {
  code: string;
};

export type SuggestionTag = BaseTag;
