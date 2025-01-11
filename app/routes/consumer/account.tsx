import { useAuth0, User } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import * as users from "~/services/users";

export default function Account() {
  const { user } = useAuth0();
  if (!user) return null;

  return (
    <div>
      <h2 className="text-3xl font-bold">{user.name}</h2>
      <AccountDetails user={user} />
    </div>
  );
}

function AccountDetails({ user }: { user: User }) {
  const userId = user.sub;
  const customerResult = useQuery({
    queryKey: ["users", userId, "customers"],
    queryFn: () => (userId ? users.getCustomer(userId) : null),
  });
  const paymentsResult = useQuery({
    queryKey: ["users", userId, "payments"],
    queryFn: () => (userId ? users.getPayments(userId) : null),
  });

  const customer = customerResult.data;
  const payments = paymentsResult.data;

  if (!customer || !payments) return null;
  console.log("payments", payments);

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold">Payments</h3>
      <PaymentsTable payments={payments} />
    </div>
  );
}

function PaymentsTable({ payments }: { payments: users.Payment[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell>{payment.id}</TableCell>
            <TableCell>{formatAmount(payment.amount, payment.currency)}</TableCell>
            <TableCell>{formatDate(payment.created)}</TableCell>
            <TableCell>
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  payment.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : payment.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {payment.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Function to format the amount with currency
const formatAmount = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency }).format(
    amount / 100,
  );
};
