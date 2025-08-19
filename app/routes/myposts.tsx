import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { redirect } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { deletePost, getPostByUserId } from "~/db/query";
import { getSession } from "~/sessions_db";
import { FaPlus } from "react-icons/fa6";

export async function loader({ request }: { request: Request }) {
    const userSession = await getSession(request.headers.get("cookie"));
    if (!userSession.has("userId")) return redirect("/login");
    
    const userID = userSession.get("userId");
    const result = await getPostByUserId(userID);
    // console.log(result);
    return result;
}

export async function action({ request }: { request: Request }) {
  const body = await request.formData();
  const deleteId = body.get("deleteId") as string;
  await deletePost(deleteId);
  return redirect("/myposts");
}

export default function MyPosts() {
    // const loaderData = useLoaderData<Posts[]>()
    const loaderData = useLoaderData<typeof loader>();
    const fetcher = useFetcher();
    const handleDeletePost = (id: string) => {
      fetcher.submit({deleteId: id}, {method: "post", action: `/posts/${id}`});
    } 

    return (
        <div className="container mx-auto">
          <Table aria-label="Example static collection table">
            <TableHeader>
              {/* <TableColumn>ID</TableColumn> */}
              <TableColumn className="uppercase">Title</TableColumn>
              <TableColumn className="uppercase">About</TableColumn>
              <TableColumn className="uppercase">Created At</TableColumn>
              <TableColumn className="uppercase">Action</TableColumn>
            </TableHeader>

            <TableBody >
              {loaderData.map((post) => (
                <TableRow key={post.id}>
                  {/* <TableCell>{post.id}</TableCell> */}
                  <TableCell>{post.title}</TableCell>
                  <TableCell className="truncate">{post.summary}</TableCell>
                  <TableCell>{new Date(post.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</TableCell>
                  <TableCell>  
                    <Dropdown>
                      <DropdownTrigger><Button isIconOnly variant="flat"><FaPlus /></Button></DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="view">
                          <Link to={`/posts/${post.slug}`}>View Post</Link>
                        </DropdownItem>
                        <DropdownItem key="edit">
                          <Link to={`/posts/editpost/${post.id}`}>Edit Post</Link>
                        </DropdownItem>
                        <DropdownItem key="delete" className="text-danger" color="danger" onClick={() => handleDeletePost(post.id)}>Delete Post</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      );
}