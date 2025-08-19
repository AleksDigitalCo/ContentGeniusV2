'use client';

// Koda kommentarer är på engelska, medan UI-elementen är på svenska för att matcha den befintliga koden.

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateInstagramText } from '@/ai/flows/generate-instagram-text';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from './ui/separator';

/**
 * Zod schema for form validation.
 * Ensures the prompt is a string with a minimum length of 10 characters.
 */
const formSchema = z.object({
  prompt: z.string().min(10, {
    message: 'Prompten måste vara minst 10 tecken lång.',
  }),
});

export function ContentGenerator() {
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  /**
   * Handles form submission. This function is called by react-hook-form
   * after the prompt has been validated against `formSchema`.
   */
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedText('');

    try {
      // The `values` object is guaranteed by react-hook-form to contain a
      // valid `prompt` string that meets the schema requirements.
      const result = await generateInstagramText(values.prompt);
      setGeneratedText(result);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Ett fel uppstod',
        description: 'Kunde inte generera text. Försök igen senare.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-10">
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-headline text-lg font-semibold">Skriv din prompt här...</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="t.ex. 'En ny smakrik vegansk burgare gjord på svarta bönor och serverad med sötpotatispommes.'"
                        className="min-h-[150px] resize-y bg-background"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} size="lg" className="w-full sm:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Genererar...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generera Text
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(isLoading || generatedText) && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">AI-genererat innehåll</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                </div>
            ) : (
            <ScrollArea className="h-auto max-h-96 w-full rounded-md bg-muted/50 p-4">
              <p className="whitespace-pre-wrap font-code text-sm">{generatedText}</p>
            </ScrollArea>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
