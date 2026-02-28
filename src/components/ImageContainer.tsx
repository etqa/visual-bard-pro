import { motion } from "framer-motion";
import { Loader2, Wand2, RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageContainerProps {
  label: string;
  emoji: string;
  image: string | null;
  loading?: boolean;
  actionLabel?: string;
  actionIcon?: "generate" | "edit";
  onAction?: () => void;
  disabled?: boolean;
}

const ImageContainer = ({
  label,
  emoji,
  image,
  loading,
  actionLabel,
  actionIcon,
  onAction,
  disabled,
}: ImageContainerProps) => {
  const handleDownload = () => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image;
    link.download = `${label}.png`;
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-4 gradient-border"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
          <span>{emoji}</span>
          <span>{label}</span>
        </h3>
        {image && (
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleDownload}>
            <Download className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      <div className="relative rounded-xl overflow-hidden bg-muted/20 min-h-[200px] flex items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-xs text-muted-foreground">جارِ الإنشاء...</p>
          </div>
        ) : image ? (
          <img src={image} alt={label} className="w-full max-h-[350px] object-contain rounded-xl" />
        ) : (
          <div className="flex flex-col items-center gap-3 py-8 text-muted-foreground">
            <span className="text-3xl opacity-30">{emoji}</span>
            <p className="text-xs">لم يتم الإنشاء بعد</p>
          </div>
        )}
      </div>

      {onAction && actionLabel && (
        <Button
          onClick={onAction}
          disabled={disabled || loading}
          className="w-full mt-3 rounded-xl h-10 text-sm font-bold bg-gradient-to-l from-primary via-secondary to-accent hover:opacity-90 text-primary-foreground"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin ml-2" />
          ) : actionIcon === "edit" ? (
            <RefreshCw className="h-4 w-4 ml-2" />
          ) : (
            <Wand2 className="h-4 w-4 ml-2" />
          )}
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default ImageContainer;
