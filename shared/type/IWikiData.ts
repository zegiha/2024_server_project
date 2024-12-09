export default interface IWikiData {
  userName: string,
  wikiData: Array<{
    category: string,
    contents: string,
  }>
};
