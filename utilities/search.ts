import { searchTypes } from '../types/search-types';

const Search = async (searchCriteria, data, filterName, brandId, modelId) => {
  console.log(data)
  console.log(filterName)
  console.log(searchCriteria)
  if(searchCriteria === searchTypes.brand) {
    const searchResult = data.filter(brand => brand.name === filterName.name);
    if(searchResult.length > 0) {
      return searchResult;
    }
  } else if (searchCriteria === searchTypes.model) {
    const searchResult = data.filter(model => model.name === filterName.name);
    if(searchResult.length > 0) {
      return searchResult;
    }
  } else {
    const searchResult = data.filter(year => year === filterName.name);
    return searchResult;
  }
}

export default Search;
