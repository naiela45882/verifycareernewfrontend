import BackendLoadingOverlay from "../ui/BackendLoadingOverlay";

export default function AIAnalysisProgress({ title, detail, variant = "analyze", visible = true }) {
  return (
    <BackendLoadingOverlay
      visible={visible}
      variant={variant}
      title={title}
      subtitle={detail}
    />
  );
}
