import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
  
  export default function CustomersPage() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription>A list of all customers.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Liam Johnson</TableCell>
                <TableCell>liam@example.com</TableCell>
                <TableCell>12</TableCell>
                <TableCell className="text-right">$1,250.00</TableCell>
              </TableRow>
               <TableRow>
                <TableCell className="font-medium">Olivia Smith</TableCell>
                <TableCell>olivia@example.com</TableCell>
                <TableCell>8</TableCell>
                <TableCell className="text-right">$850.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
  