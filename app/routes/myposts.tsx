import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPostByUserId } from "~/db/query";
import { getSession } from "~/sessions_db";

export async function loader({ request }: { request: Request }) {
    const userSession = await getSession(request.headers.get("cookie"));
    if (!userSession.has("userId")) return redirect("/login");
    
    const userID = userSession.get("userId");
    const result = await getPostByUserId(userID);
    return result;
}

export default function MyPosts() {
    const loaderData = useLoaderData()
    return (
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>TITLE</TableColumn>
            <TableColumn>DESCRIPTION</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>

          <TableBody>
            {loaderData.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.description}</TableCell>
                <TableCell>
                  <a href={`/posts/editpost/${post.id}`}>Edit</a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
}