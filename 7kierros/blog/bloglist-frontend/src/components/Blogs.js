import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Link
} from '@mui/material'


const Blogs = ({ blogs }) => {
  return (
    <div>
      <h2>Blogs:</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map(blog => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link href={blog.id}>{blog.title}</Link>
                </TableCell>
                <TableCell >
                By: {blog.author}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Blogs