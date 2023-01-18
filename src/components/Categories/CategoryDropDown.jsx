import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlice";

const options = [
  { value: "chocolate", label: "chocos" },
  { value: "chocsfsdfage", label: "chslkdjfsocos" },
  { value: "skdfjsjdkfe", label: "sakdfjdsfcos" },
];
const CategoryDropDown = (props) => {
    console.log(props)
  //dispatch action
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);
  //select category from categoris list
  const category = useSelector(state => state?.category);
  const { categoryList, loading, appErr, serverErr } = category;

  const allCategories = categoryList?.map(category => {
    return {
      label: category?.title,
      value: category?._id,
    };
  });
  //handle Change

  const handleChange = (value) => {
    props.onChange("category", value);
  }
    //handleBlur
    const handleBlur = () => {
      props.onBlur("category", true);
    };
    return (
        <div style={{margin:'1rem 0'}}>
            {loading ? <h3 className="text-base text-green-600">categories lists are loading please wait...</h3>:
            <Select 
         onChange={handleChange}
         onBlur={handleBlur}
         id="category" 
         options={allCategories}
         value={props?.value?.label}
         />}
    {/*display error*/}
    {props?.error && <div style={{color:'red',marginTop:'.5rem'}}>{props?.error}</div>}

    </div>
    );
  
};
export default CategoryDropDown;
