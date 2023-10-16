"use client";

import { Button } from "@/shadcn-ui/ui/button";
import { useToast } from "@/shadcn-ui/ui/use-toast";
import axios from "axios";
import { useState } from "react";
import { LuSparkles } from "react-icons/lu";

interface SubscriptionBtn {
  isPro: boolean;
}

const SubscriptionBtn = ({ isPro = false }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Oops! Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      onClick={onClick}
      size={"lg"}
      variant={isPro ? "default" : "premium"}
      className="text-lg m-4"
    >
      {isPro ? "Manage Subscriptions" : "Upgrade"}
      {!isPro && <LuSparkles className="h-4 w-4 ml-2 fill-white" />}
    </Button>
  );
};

export default SubscriptionBtn;
