function formatDate(dateTime) {
    const date = dateTime.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const time = dateTime.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return `${date} - ${time}`;
}

export { formatDate };
