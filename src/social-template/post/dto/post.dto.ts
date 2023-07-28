export class CreatePostDto {
  username: string;
  content: string;
  image: string;
}

export class UpdatePostDto {
  postId: string;
  username: string;
  content: string;
  image: string;
}
