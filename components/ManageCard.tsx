import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type ManageCardProps = {
  cardTitle: string;
  total: number;
  children: React.ReactNode;
};

export default function ManageCard({
  cardTitle,
  total,
  children,
}: ManageCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex w-full justify-between">
            <span>{cardTitle}</span>
            <span>{total}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        {children}
      </CardContent>
    </Card>
  );
}
