"use client";

import { useProModal } from "@/hooks/useProModal";
import { Button } from "@/shadcn-ui/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shadcn-ui/ui/dialog";
import { Separator } from "@/shadcn-ui/ui/separator";
import { useToast } from "@/shadcn-ui/ui/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";

export const ProModal = () => {
  const proModal = useProModal();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Oops! Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">Upgrade to Pro</DialogTitle>
          <DialogDescription className="text-center space-y-2">
            Create{" "}
            <span className="bg-gradient-to-r from-cyan-400  to-pink-400 text-transparent bg-clip-text mx-1 font-bold">
              Custom AI
            </span>{" "}
            Companions!
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex justify-between ">
          <p className="text-2xl font-medium">
            ₹249<span className="text-sm "> /month</span>
          </p>
          <Button disabled={loading} onClick={onSubscribe} variant={"premium"}>
            Subscribe!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
