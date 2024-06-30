import { ClientOnly } from './client';

type Props = {
    params: {
        id: string;
    };
};
export default function Page({ params }: Props) {
    return <ClientOnly id={params.id} />;
}
