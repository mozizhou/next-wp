import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const page = async (params) => {
	const post = await getSinglePost(params.params.postId);
	if (!post) {
		return <div>Loading...</div>;
	}
	let rendered = post.content.rendered
	console.log(rendered)
	return (
		<div className="single-blog-page">
			<h2>{post.title.rendered}</h2>
			<div className="blog-post">
				<div dangerouslySetInnerHTML={{ __html: rendered }}></div>
			</div>
		</div>
	);
};

async function getSinglePost(postId) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts/${postId}`
	);
	const post = await response.json();
	return post;
}

export async function generateStaticParams() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts`
	);
	const posts = await response.json();
	return posts.map((post) => ({
		postId: post.id.toString(),
	}));
}
export default page;
