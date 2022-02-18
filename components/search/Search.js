import React, { useState } from "react";

const Search = ({ category, url, isYasalam }) => {
   const [search, setSearch] = useState("");
   const [currCategory, setCurrCategory] = useState({
      id: "all",
      name: "All Categories",
   });
   const [currFeature, setCurrFeature] = useState({
      id: "all",
      name: "All Features",
   });
   const [currRegion, setCurrRegion] = useState({
      id: "all",
      name: "All Regions",
   });
   const [regions, setRegion] = useState([]);
   const [features, setFeature] = useState([]);
   const [categories, setCategories] = useState([]);

   return (
      <div className="mt-10 search-form-container">
         <form>
            <div className="main-search-input">
               <div className="search-container">
                  <input
                     autoComplete="off"
                     name="keyword_search"
                     id="keyword_search"
                     className="keyword_search"
                     type="text"
                     placeholder="What are you looking for?"
                     value=""
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
                                       });
                                    }}
                                 >
                                    {region.name}
                                 </li>
                              ))}
                              <li
                                 key={regions.length + 5}
                                 onClick={() => {
                                    setCurrRegion({
                                       id: "no region",
                                       name: "no region",
                                    });
                                 }}
                              >
                                 No Region
                              </li>
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

export default Search;
