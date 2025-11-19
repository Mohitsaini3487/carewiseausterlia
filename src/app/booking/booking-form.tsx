"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon, AlertCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useUser } from "@/firebase";

interface FormState {
  message: string | null;
  errors: Record<string, string[]> | null;
}

const initialState: FormState = {
  message: null,
  errors: null,
};

export default function BookingForm() {
  const { user } = useUser();
  const [state, setState] = useState<FormState>(initialState);
  const [pending, setPending] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [date, setDate] = useState<Date>();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      const nameParts = user.displayName?.split(" ") || ["", ""];
      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(" ") || "");
      setEmail(user.email || "");
    }
  }, [user]);

  useEffect(() => {
    if (state.message && !state.errors) {
      toast({
        title: "Success!",
        description: state.message,
        variant: "default",
        className: "bg-accent text-accent-foreground",
      });
      formRef.current?.reset();
      setDate(undefined);
      setState(initialState);
    }
  }, [state, toast]);

// 🔥 SUBMIT USING NEXT.JS API (Nodemailer)
const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!user) {
    setState({
      message: "You must be logged in to make a booking.",
      errors: { _form: ["Authentication required."] },
    });
    return;
  }

  setPending(true);
  setState(initialState);

  const formData = new FormData(event.currentTarget);
  formData.set("userId", user.uid);
  formData.set("bookingDate", date ? format(date, "yyyy-MM-dd") : "");

  // Convert FormData → JSON
  const payload = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/api/send-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.success) {
      setState({ message: data.message, errors: null });
    } else {
      setState({ message: data.message, errors: { _form: [data.message] } });
    }
  } catch (error) {
    setState({
      message: "Something went wrong while submitting.",
      errors: { _form: ["Network error."] },
    });
  }

  setPending(false);
};


  return (
    <Card className="w-full shadow-lg">
      <form onSubmit={handleSubmit} ref={formRef}>
        <CardHeader>
          <CardTitle className="text-2xl">Booking Details</CardTitle>
          <CardDescription>
            All services are charged at an hourly rate.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {state.errors?.firstName && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.firstName[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {state.errors?.lastName && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.lastName[0]}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {state.errors?.email && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.email[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex items-center gap-2">
                <Select name="countryCode" defaultValue="+61">
                  <SelectTrigger className="w-[80px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+61">+61</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="412 345 678"
                />
              </div>
              {state.errors?.phone && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.phone[0]}
                </p>
              )}
            </div>
          </div>

          <input
            type="hidden"
            name="bookingDate"
            value={date ? format(date, "yyyy-MM-dd") : ""}
          />

          <div className="space-y-2">
            <Label htmlFor="bookingDate">Date of Booking</Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(day) => day < new Date()}
                />
              </PopoverContent>
            </Popover>

            {state.errors?.bookingDate && (
              <p className="text-sm font-medium text-destructive">
                {state.errors.bookingDate[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceType">Type of Service</Label>
            <Select name="serviceType">
              <SelectTrigger id="serviceType">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Shopping Assistance">
                  Shopping Assistance
                </SelectItem>
                <SelectItem value="Domestic Assistance">
                  Domestic Assistance
                </SelectItem>
                <SelectItem value="Transport & Appointments">
                  Transport & Appointments
                </SelectItem>
                <SelectItem value="Companion Support">
                  Companion Support
                </SelectItem>
                <SelectItem value="Welfare Checks">
                  Welfare Checks
                </SelectItem>
              </SelectContent>
            </Select>

            {state.errors?.serviceType && (
              <p className="text-sm font-medium text-destructive">
                {state.errors.serviceType[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Time for Assistance</Label>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeFrom" className="text-xs text-muted-foreground">
                  From
                </Label>
                <div className="flex gap-2">
                  <Input id="timeFrom" name="startTime" type="time" className="flex-1" />
                  <Select name="startAmPm">
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder="AM/PM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeTo" className="text-xs text-muted-foreground">
                  To
                </Label>
                <div className="flex gap-2">
                  <Input id="timeTo" name="endTime" type="time" className="flex-1" />
                  <Select name="endAmPm">
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder="AM/PM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bookingFor">Booking For (Details)</Label>
            <Textarea
              id="bookingFor"
              name="details"
              placeholder="e.g., Booking for my mother, Jane Doe. Requires assistance with weekly grocery shopping."
              rows={4}
            />
            {state.errors?.details && (
              <p className="text-sm font-medium text-destructive">
                {state.errors.details[0]}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          {state.message && state.errors && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={pending || !user} size="lg">
            {pending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              "Submit Booking Request"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
