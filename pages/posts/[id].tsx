import { IPostElement } from "../../pages/index";
import style from "../../styles/PostScreen.module.css";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import PostModel from "../../models/post";
import dbConnect from "../../lib/dbConnect";
import Comments from "../../components/Comments/Comments";

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();
  const postArr = await PostModel.find({}, { _id: 1 });

  const paths = postArr.map((element: IPostElement) => ({
    params: { id: element._id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await PostModel.findById(params?.id);

  if (!postData) return { notFound: true };

  return {
    props: {
      postInfo: JSON.stringify(postData),
    },
  };
};

export default function PostScreen({
  postInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!postInfo) return <h1>Loading...</h1>;
  const post = JSON.parse(postInfo);

  const { title, author, createdAt, content } = post || {};

  return (
    <div className={style.wrapper}>
      <h1 className={style.header}>{title}</h1>
      <div className={style.post}>
        <p>{author}</p>
        <p>{createdAt}</p>
      </div>
      <p className={style.text}>{content}</p>
      <Comments>
        <p>comments list</p>
      </Comments>
    </div>
  );
}
