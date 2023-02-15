import { useEffect } from "react";
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPostsAction, toggleAddDisLikesToPost, toggleAddLikesToPost } from "../../redux/slices/posts/postSlices";
import DateFormatter from "../../utils/DateFormatter";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlice";
import LoadingComponent from "../../utils/LoadingComponent";


export default function PostsList() {
   //select post from store
   const post = useSelector(state => state?.post);
   const { postLists, loading, appErr, serverErr,likes,disLikes } = post;
 
   //select categories from store
   const category = useSelector(state => state?.category);
   const {
     categoryList,
     loading: catLoading,
     appErr: catAppErr,
     serverErr: catServerErr,
   } = category;
 
  //dispatch
  const dispatch = useDispatch();
  //fetch post
  useEffect(() => {
    dispatch(fetchPostsAction(""));
  }, [dispatch,likes,disLikes]);
  //fetch categories
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

 
  return (
    <>
      <section>
        <div class="py-20 bg-gray-200 min-h-screen radius-for-skewed p-10">
          <div class="container mx-auto px-4">
            <div class="mb-20 flex flex-wrap items-center">
              <div class="w-full lg:w-1/2">
                <span class="text-black-600 font-bold font-serif text-blue-400">
                  Latest Posts from our awesome authors
                </span>
                <h2 class="text-4xl text-black-300 lg:text-5xl font-bold font-serif font-heading">
                  Latest Post
                </h2>
              </div>
              {/* <div class=" block w-1/2"> */}
                {/* View All */}
                {/* <button onClick ={()=>{dispatch(fetchPostsAction(""))}}class="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-green-600 hover:bg-green-700 text-gray-50 font-bold leading-loose transition duration-200">
                  View All Posts
                </button> */}
              {/* </div> */}
            </div>
            <div class="flex flex-wrap -mx-3">
              <div class="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
                <div class="py-4 px-6 bg-gray-300  shadow-md shadow-gray-500 rounded">
                  <h4 class="mb-4 text-black-500 font-bold font-serif uppercase">
                    Categories
                  </h4>
                  <ul>
                  <li onClick ={()=>{dispatch(fetchPostsAction(""))}}class="block cursor-pointer py-2 px-3 mb-4 rounded shadow-md shadow-gray-500 text-black-500 font-bold font-serif bg-white w-full">
                  View All Posts
                </li>
                    {catLoading ? (
                      <LoadingComponent />
                    ) : catAppErr || catServerErr ? (
                      <h1>
                        {catServerErr} {catAppErr}
                      </h1>
                    ) : categoryList?.length <= 0 ? (
                      <h1>No Category Found</h1>
                    ) : (
                      categoryList?.map(category => (
                        <li>
                          <p onClick={()=>dispatch(fetchPostsAction(category.title))} className="block cursor-pointer py-2 px-3 mb-4 rounded shadow-md shadow-gray-500 text-black-500 font-bold font-serif bg-white w-full">
                            {category?.title}
                          </p>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
              <div class="w-full lg:w-3/4 px-7 shadow-md shadow-gray-500">
                {/* Post goes here */}

                {appErr || serverErr ? (
                  <h1 className="text-black text-lg text-center">
                    {serverErr} {appErr}
                  </h1>
                ) : postLists?.length <= 0 ? (
                  <h1 className="text-yellow-400 text-lg text-center">No Post Found</h1>
                ) : (
                  postLists?.map(post => (
                    <div key={post.id} class="mt-5 flex flex-wrap bg-gray-300 -mx-3  lg:mb-6 shadow-md shadow-gray-500 ">
                      <div class="mb-10 w-full h-41 lg:w-1/4 px-8 py-8 p-20 ">
                        <Link>
                          {/* Post image */}
                          <img
                            class="mt-4 w-full h-30 object-cover rounded"
                            src={post?.image}
                            alt=""
                          />
                        </Link>
                        {/* Likes, views dislikes */}
                        <div className="p-4 flex flex-row bg-gray-300 justify-center w-full  items-center ">
                          {/* Likes */}
                          <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            {/* Togle like  */}
                            <div className="ml-4">
                              <ThumbUpIcon onClick={()=>dispatch(toggleAddLikesToPost(post?._id))} className="h-5 w-5 text-blue-600 cursor-pointer" />
                            </div>
                            <div className="pl-2 text-gray-600">
                              {post?.likes?.length}
                            </div>
                          </div>
                          {/* Dislike */}
                          <div className="flex flex-row  justify-center items-center  mr-4 pb-2 pt-1 ">
                            <div>
                              <ThumbDownIcon onClick={()=>dispatch(toggleAddDisLikesToPost(post?._id))} className="h-5 w-5 cursor-pointer text-gray-600" />
                            </div>
                            <div className="pl-2 text-gray-600">
                              {post?.disLikes?.length}
                            </div>
                          </div>
                          {/* Views */}
                          <div className="flex flex-row justify-center items-center  mr-4 pb-2 pt-1">
                            <div>
                              <EyeIcon className="h-5 w-5  text-gray-400" />
                            </div>
                            <div className="pl-2 text-gray-600">
                              {post?.numViews}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="w-full lg:w-3/4 px-3">
                        <Link class="hover:underline">
                          <h3 class="mb-1 pt-12 text-2xl text-black-400 font-bold font-heading">
                            {/* {capitalizeWord(post?.title)} */}
                            {post?.title}
                          </h3>
                        </Link>
                        <p class="text-black whitespace-normal truncate h-36">{post?.description}.....</p>
                        {/* Read more */}
                        <div className="mt-5">
                              <Link
                                to={`/posts/${post?._id}`}
                                className=" text-gray-500 hover:underline "
                              >
                                Read More..
                              </Link>
                            </div>
                        {/* User Avatar */}
                        <div className=" flex items-center ">
                              <div className="mt-3 flex-shrink-0 ">
                            <Link>
                              <img
                                className="h-10 w-10 rounded-full"
                                src={post?.user?.profilePhoto}
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="ml-1">
                            <p className="text-sm font-medium text-gray-900 mt-4">
                              <Link to = {`/profile/${post?.user?._id}`}className="text-black-400 hover:underline ">
                                {post?.user?.firstName} {post?.user?.lastName}
                              </Link>
                            </p>
                            <div className="flex space-x-1 text-sm text-black-500">
                              <time>
                                <DateFormatter date={post?.createdAt} />
                              </time>
                              <span aria-hidden="true">&middot;</span>
                            </div>
                          </div>
                        </div>
                        {/* <p class="text-gray-500">
                             Quisque id sagittis turpis. Nulla sollicitudin rutrum
                             eros eu dictum...
                           </p> */}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-900">
          <div class="skew bg-green-500 skew-bottom mr-for-radius">
            <svg
              class="h-8 md:h-12 lg:h-10 w-full text-gray-900"
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 0 10"></polygon>
            </svg>
          </div>
          <div class="skew bg-gray-500  skew-bottom ml-for-radius">
            <svg
              class="h-8 bg-gray-500 md:h-12 lg:h-20 w-full text-gray-900"
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 10 10"></polygon>
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}
