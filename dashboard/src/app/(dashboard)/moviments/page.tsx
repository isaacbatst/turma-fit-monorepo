import SectionTitle from "../../components/SectionTitle";
import CreateMovimentForm from "./CreateMovimentForm";
import MovimentsList from "./MusclesList";

export default function Moviments() {
  return (
    <section className="flex flex-col">
      <SectionTitle>Movimentos</SectionTitle>
      <CreateMovimentForm />
      <ul className="grid xl:grid-cols-2 2xl:grid-cols-3 gap-3 my-10">
        <MovimentsList />
      </ul>
    </section>
  );
}
