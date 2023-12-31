"use client";

import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn-ui/ui/form";
import { Separator } from "@/shadcn-ui/ui/separator";
import ImageUpload from "./ImageUpload";
import { Input } from "@/shadcn-ui/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn-ui/ui/select";
import { Textarea } from "@/shadcn-ui/ui/textarea";
import { Button } from "@/shadcn-ui/ui/button";
import { LuWand2 } from "react-icons/lu";
import { useToast } from "@/shadcn-ui/ui/use-toast";
import { useRouter } from "next/navigation";

const PREAMBLE = `You are a fictional character whose name is Elon Musk. You are a visionary entrepreneur and inventor. You have a passion for space exploration, electric vehicles, sustainable energy, and advancing human capabilities. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about innovations and the potential of space colonization.
`;

const SEED_CHAT = `Human: Hi Elon, how's your day been?
Elon: Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenges are immense, but the potential is even greater.

Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live.

Human: It's fascinating to see your vision unfold. Any new projects or innovations you're excited about?
Elon: Always! But right now, I'm particularly excited about Neuralink. It has the potential to revolutionize how we interface with technology and even heal neurological conditions.
`;

interface CompanionFormProps {
  initialData: Companion | null;
  categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required!",
  }),
  description: z.string().min(20, {
    message: "Description requires atleast 20 characters!",
  }),
  instructions: z.string().min(200, {
    message: "Instructions require atleast 200 characters!",
  }),
  seed: z.string().min(200, {
    message: "Seed requires atleast 200 characters!",
  }),
  src: z.string().min(1, {
    message: "Image is required!",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required!",
  }),
});

const CompanionForm: React.FC<CompanionFormProps> = ({
  initialData,
  categories,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    },
  });

  const loading = form.formState.isSubmitting;

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        // Updating the Companion
        await axios.patch(`/api/companion/${initialData.id}`, values);
        toast({
          description: "Companion updated successfully!",
        });
      } else {
        // Creating the Companion
        await axios.post("/api/companion", values);

        toast({
          description: "Companion created successfully!",
        });
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong!",
      });
    }
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-4xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 pb-10 "
        >
          <div className="space-y-2 w-full ">
            <section>
              <h3 className="text-lg font-medium">General Information</h3>
              <p className="text-sm text-muted-foreground">
                General information about your companion
              </p>
            </section>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4 ">
                <FormControl>
                  <ImageUpload
                    disabled={loading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Elon Musk"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is how your AI Companion will be named.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="CEO and Founder of Tesla & SpaceX"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short description for your AI Companion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder={"Select a Category"}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a Category for your AI-Companion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <section className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">Configuration</h3>
              <p className="text-sm text-muted-foreground ">
                Detailed Instructions for AI&apos;s behaviour
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </section>
          <FormField
            name="instructions"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" col-span-2 md:col-span-1">
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    placeholder={PREAMBLE}
                    {...field}
                    className="bg-background resize-y span-1 h-32"
                  />
                </FormControl>
                <FormDescription>
                  Describe in detail your Companion&apos;s backstory and
                  relevant details
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="seed"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel>Example Conversation</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    placeholder={SEED_CHAT}
                    {...field}
                    className="bg-background resize-y span-1 h-32"
                  />
                </FormControl>
                <FormDescription>
                  Describe in detail your Companion&apos;s backstory and
                  relevant details
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <section className="w-full flex justify-center">
            <Button size={"lg"} disabled={loading}>
              {initialData ? "Edit your Companion" : "Create your Companion"}
              <LuWand2 className="w-4 h-4 ml-2" />
            </Button>
          </section>
        </form>
      </Form>
    </div>
  );
};

export default CompanionForm;
