export enum FilterMatch {
  EQUALS = 'eq',
  UNEQUAL = 'ne',
  GREATHER = 'gt',
  GREATHER_OR_EQUAL = 'gte',
  LOWER_OR_EQUAL = 'lte',
  LOWER = 'lt',
  STARTS_WITH = 'starts',
  LIKE = 'like',
  ENDS_WITH = 'ends',
  NOT = 'not',
  IS_NULL = 'isnull',
  NOT_NULL = 'notnull',
}
