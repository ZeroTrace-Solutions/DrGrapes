export const normalizations = {
    date: (dateString) => {
        // Parse DD / MM / YYYY to ISO format
        let formattedDob = dateString;
        if (dateString && dateString.includes('/')) {
            const parts = dateString.split('/').map(p => p.trim());
            if (parts.length === 3) {
                const [day, month, year] = parts;
                // Create date at midnight UTC
                const date = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));
                formattedDob = date.toISOString();
            }
        }
        return formattedDob;
    },

    signupData: (data) => {
        return {
            full_name: data.fullName,
            username: data.username,
            email: data.email,
            password: data.password,
            dateOfBirth: normalizations.date(data.dob),
            gender: data.gender?.toUpperCase(),
            level: data.academicLevel,
            universityId: data.universityId,
            facultyId: data.facultyId,
        };
    }
}