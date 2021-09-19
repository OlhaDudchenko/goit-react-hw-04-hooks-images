import errorImage from "../Error/nosmile.jpg";

export function ErrorMessage({ text }) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <img src={errorImage} width="240" alt="sadsmile" />
      <p style={{ fontSize: "18px", fontWeight: "600" }}>{text}</p>
    </div>
  );
}
