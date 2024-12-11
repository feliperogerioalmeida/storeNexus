import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table"
import { Prisma } from "@prisma/client"

interface CategoriesTableProps {
  categories: Prisma.CategoryGetPayload<{
    include: {
      products: {
        select: {
          id: true
        }
      }
    }
  }>[]
}

const CategoriesTable = ({ categories }: CategoriesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Produtos</TableHead>
          <TableHead>Porcentagem das Vendas </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.products.length}</TableCell>
            <TableCell>0%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default CategoriesTable
