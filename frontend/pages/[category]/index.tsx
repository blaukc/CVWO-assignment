import ForumLayout from "../../components/layout/ForumLayout";
import { useRouter } from "next/router";
import { getCategories } from "../../api";
import { useEffect, useState } from "react";
import { ICategories } from "../../interfaces/api";

interface IProps {
    // categories: ICategories[];
}

const Category: React.FC<IProps> = (props: IProps) => {
    // const [categories, setCategories] = useState({});
    const router = useRouter();
    const id = router.query.id as string;

    // const fetchCategories = async () => {
    //     const res = await getCategories();
    //     setCategories(res);
    //     console.log(res);
    // };

    // useEffect(() => {
    //     fetchCategories();
    // }, []);

    return (
        <>
            <div></div>
            <ForumLayout />
        </>
    );
};

export const getStaticPaths = async () => {
    const categories: ICategories[] = await getCategories();
    const paths = categories.map((data: ICategories) => {
        return {
            params: {
                category: data.category,
            },
        };
    });

    return {
        paths: paths,
        fallback: false,
    };
};

export const getStaticProps = async () => {
    return {
        props: {},
    };
};

export default Category;
