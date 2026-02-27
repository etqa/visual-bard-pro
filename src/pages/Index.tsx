import { useState, useCallback } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ImageUploader from "@/components/ImageUploader";
import PromptOptions, { defaultOptions, type PromptOption } from "@/components/PromptOptions";
import PromptResult from "@/components/PromptResult";

const Index = () => {
  const [image, setImage] = useState<string | null>(null);
  const [options, setOptions] = useState<PromptOption[]>(defaultOptions);
  const [promptAr, setPromptAr] = useState("");
  const [promptEn, setPromptEn] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const handleToggle = useCallback((id: string) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, enabled: !opt.enabled } : opt))
    );
  }, []);

  const handleGenerate = async () => {
    if (!image) {
      toast.error("الرجاء رفع صورة أولاً");
      return;
    }

    const enabledOptions = options.filter((o) => o.enabled).map((o) => o.labelEn);
    if (enabledOptions.length === 0) {
      toast.error("الرجاء تفعيل خيار واحد على الأقل");
      return;
    }

    setLoading(true);
    setHasResult(false);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-image", {
        body: { image, options: enabledOptions },
      });

      if (error) throw error;

      setPromptAr(data.promptAr || "");
      setPromptEn(data.promptEn || "");
      setHasResult(true);
      toast.success("تم إنشاء البرومت بنجاح! ✨");
    } catch (err: any) {
      console.error("Error generating prompt:", err);
      toast.error(err.message || "حدث خطأ أثناء إنشاء البرومت");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg" dir="rtl">
      {/* Decorative orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-secondary/10 blur-[120px]" />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-8 md:py-16">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-black gradient-text mb-3">
            وصف الصورة
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            حلّل صورتك بالذكاء الاصطناعي واحصل على برومت احترافي جاهز للاستخدام
          </p>
        </motion.header>

        {/* Image Upload */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <ImageUploader image={image} onImageChange={setImage} />
        </motion.section>

        {/* Options */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            ⚙️ خيارات البرومت
          </h2>
          <PromptOptions options={options} onToggle={handleToggle} />
        </motion.section>

        {/* Generate Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Button
            onClick={handleGenerate}
            disabled={loading || !image}
            className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-l from-primary via-secondary to-accent hover:opacity-90 transition-opacity text-primary-foreground shadow-lg shadow-primary/25"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin ml-2" />
                جارِ التحليل...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 ml-2" />
                إنشاء البرومت
              </>
            )}
          </Button>
        </motion.div>

        {/* Results */}
        {hasResult && (
          <PromptResult
            promptAr={promptAr}
            promptEn={promptEn}
            onUpdateAr={setPromptAr}
            onUpdateEn={setPromptEn}
          />
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-muted-foreground">
          مجاني بالكامل • مدعوم بالذكاء الاصطناعي ✨
        </footer>
      </div>
    </div>
  );
};

export default Index;
