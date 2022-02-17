import { useEffect, useState } from "react";

const useCategory = (category) => {
   const [categories, setCategories] = useState([]);

   const homeCategories = [
      "hotel",
      "sport club",
      "sport academy",
      "fitness center",
      "pool",
      "beach",
      "fitness classes",
      "marine sport",
   ];

   const modifiedCategory = category
      ?.map((category) => {
         switch (category.name.toLowerCase()) {
            case homeCategories[0]:
               category.count = 10;
               break;
            case homeCategories[1]:
               category.count = 3;
               break;
            case homeCategories[2]:
               category.count = 3;
               break;
            case homeCategories[3]:
               category.count = 50;
               break;
            case homeCategories[4]:
               category.count = 22;
               break;
            case homeCategories[5]:
               category.count = 5;
               break;
            case homeCategories[6]:
               category.count = 100;
               break;
            case homeCategories[7]:
               category.count = 3;
               break;

            default:
         }
         if (homeCategories.includes(category.name.toLowerCase())) {
            return category;
         }
      })
      .filter((category) => category !== undefined);

   useEffect(() => {
      setCategories(modifiedCategory);

      return () => {
         setCategories([]);
      };
   }, []);

   return categories;
};

export default useCategory;
