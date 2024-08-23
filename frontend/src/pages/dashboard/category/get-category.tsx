import React from 'react'
import useSWR from 'swr'
import { getCategories } from '../../../API/categoryApi'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../../@/components/ui/table'

const CategoryPage = () => {
  const { data: categories } = useSWR("/viewcategory", getCategories)

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SN</TableHead>
            <TableHead>Category name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category, idx) => (
            <TableRow key={category._id}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell>{category.categoryName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default CategoryPage