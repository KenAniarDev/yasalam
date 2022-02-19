import React, { useState } from "react";

const Search = ({
   category,
   url,
   isYasalam,
   features,
   regions,
   setFilterItem,
   outlets,
}) => {
   const [search, setSearch] = useState("");
   const [currCategory, setCurrCategory] = useState({
      id: "all",
      name: "All Categories",
      value: "",
   });
   const [currFeature, setCurrFeature] = useState({
      id: "all",
      name: "All Features",
      value: "",
   });
   const [currRegion, setCurrRegion] = useState({
      id: "all",
      name: "All Regions",
      value: "",
   });
   const [region, setRegion] = useState([]);
   const [feature, setFeature] = useState([]);
   const [categories, setCategories] = useState([]);

   const searchFilterHandler = (e) => {
      e.preventDefault();
      const filtered = outlets.filter((val) => {
         if (
            search === "" &&
            currCategory === "" &&
            currFeature === "" &&
            currRegion === ""
         ) {
            return val;
         } else if (
            val.name.toLowerCase().includes(search.toLowerCase()) &&
            val.categoryName.includes(currCategory.value) &&
            val.regionName.includes(currRegion.value) &&
            val.featureName.includes(currFeature.value)
         ) {
            return val;
         }
      });
      setFilterItem(filtered);
   };

   return (
      <div className="mt-10 search-form-container">
         <form onSubmit={searchFilterHandler}>
            <div className="main-search-input">
               <div className="search-container">
                  <input
                     autoComplete="off"
                     name="keyword_search"
                     id="keyword_search"
                     className="keyword_search"
                     type="text"
                     placeholder="What are you looking for?"
                     value={search}
                     onChange={(e) => {
                        setSearch(e.target.value);
                     }}
                  />
               </div>
               <div className="filter-container">
                  <div className="filter-option">
                     <span className="parent">
                        <div className="dropdown dropdown-down">
                           <div tabIndex="0" className="dropdown-text">
                              {currCategory.name}{" "}
                              <i className="far fa-angle-down"></i>
                           </div>
                           <ul tabIndex="0" className="dropdown-content">
                              <li
                                 key={1}
                                 onClick={() => {
                                    setCurrCategory({
                                       id: "all",
                                       name: "All Categories",
                                       value: "",
                                    });
                                 }}
                              >
                                 All Categories
                              </li>
                              {category.map((categoryList, i) => (
                                 <li
                                    key={i + 2}
                                    onClick={() => {
                                       setCurrCategory({
                                          id: categoryList.id,
                                          name: categoryList.name,
                                          value: categoryList.name,
                                       });
                                    }}
                                 >
                                    {categoryList.name}
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </span>
                  </div>
                  <div className="filter-option">
                     <span className="parent">
                        <div className="dropdown dropdown-down">
                           <div tabIndex="0" className="dropdown-text">
                              {currRegion.name}{" "}
                              <i className="far fa-angle-down"></i>
                           </div>
                           <ul tabIndex="0" className="dropdown-content">
                              <li
                                 key={1}
                                 onClick={() => {
                                    setCurrRegion({
                                       id: "all",
                                       name: "All Regions",
                                       value: "",
                                    });
                                 }}
                              >
                                 All Regions
                              </li>
                              {regions.map((region, i) => (
                                 <li
                                    key={i + 2}
                                    onClick={() => {
                                       setCurrRegion({
                                          id: region._id,
                                          name: region.name,
                                          value: region.name,
                                       });
                                    }}
                                 >
                                    {region.name}
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </span>
                  </div>
                  <div className="filter-option">
                     <span className="parent">
                        <div className="dropdown dropdown-down">
                           <div tabIndex="0" className="dropdown-text">
                              {currFeature.name}{" "}
                              <i className="far fa-angle-down"></i>
                           </div>
                           <ul tabIndex="0" className="dropdown-content">
                              <li
                                 key={1}
                                 onClick={() => {
                                    setCurrFeature({
                                       id: "all",
                                       name: "All Features ",
                                       value: "",
                                    });
                                 }}
                              >
                                 All Features
                              </li>
                              {features.map((feature, i) => (
                                 <li
                                    key={i + 2}
                                    onClick={() => {
                                       setCurrFeature({
                                          id: feature._id,
                                          name: feature.name,
                                          value: feature.name,
                                       });
                                    }}
                                 >
                                    {feature.name}
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </span>
                  </div>
               </div>
               <button>Search</button>
            </div>
         </form>
      </div>
   );
};

export default React.memo(Search);
