import { useState } from "react";
import { Copy, Check, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface PromptResultProps {
  promptAr: string;
  promptEn: string;
  onUpdateAr: (val: string) => void;
  onUpdateEn: (val: string) => void;
}

const PromptResult = ({ promptAr, promptEn, onUpdateAr, onUpdateEn }: PromptResultProps) => {
  const [copiedLang, setCopiedLang] = useState<string | null>(null);
  const [editingLang, setEditingLang] = useState<string | null>(null);

  const handleCopy = async (text: string, lang: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedLang(lang);
    toast.success(lang === "ar" ? "تم النسخ!" : "Copied!");
    setTimeout(() => setCopiedLang(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Tabs defaultValue="ar" className="w-full" dir="rtl">
        <TabsList className="w-full bg-muted/30 rounded-xl">
          <TabsTrigger value="ar" className="flex-1 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            🇸🇦 عربي
          </TabsTrigger>
          <TabsTrigger value="en" className="flex-1 rounded-lg data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
            🇬🇧 English
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ar" className="mt-4">
          <div className="glass-card rounded-xl p-4 gradient-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-foreground">البرومت بالعربية</h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingLang(editingLang === "ar" ? null : "ar")}
                  className="h-8 w-8"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(promptAr, "ar")}
                  className="h-8 w-8"
                >
                  {copiedLang === "ar" ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            {editingLang === "ar" ? (
              <Textarea
                value={promptAr}
                onChange={(e) => onUpdateAr(e.target.value)}
                className="min-h-[150px] bg-background/50 border-border text-foreground"
                dir="rtl"
              />
            ) : (
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-sm" dir="rtl">
                {promptAr}
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="en" className="mt-4">
          <div className="glass-card rounded-xl p-4 gradient-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-foreground">English Prompt</h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingLang(editingLang === "en" ? null : "en")}
                  className="h-8 w-8"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(promptEn, "en")}
                  className="h-8 w-8"
                >
                  {copiedLang === "en" ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            {editingLang === "en" ? (
              <Textarea
                value={promptEn}
                onChange={(e) => onUpdateEn(e.target.value)}
                className="min-h-[150px] bg-background/50 border-border text-foreground"
                dir="ltr"
              />
            ) : (
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-sm" dir="ltr">
                {promptEn}
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default PromptResult;
