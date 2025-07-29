import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockLeads } from "@/lib/mock-data";
import { format, parseISO } from 'date-fns';

export default function LeadsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold">Leads</h1>
            <p className="text-muted-foreground">View and manage potential customers.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>All Leads</CardTitle>
            <CardDescription>A list of all qualified leads from all platforms.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{lead.platform}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      lead.status === 'converted' ? 'default' : 
                      lead.status === 'contacted' ? 'outline' : 
                      'secondary'
                    }>{lead.status}</Badge>
                  </TableCell>
                  <TableCell>{format(parseISO(lead.createdAt), "PPpp")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
