import CreateEventForm from './CreateEventForm';

export default function CreateEventPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-8 font-clash">Create New Event</h1>
            <CreateEventForm />
        </div>
    );
}
