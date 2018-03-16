import React from 'react';


class Services extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Services BR</h1>
                <p>
                    Le BR propose tout un ensemble de services aux étudiants de l'École polytechnique :
                    hébergement de serveurs, sites pour les associations, machines de calcul, dépannage...

                    Il tient une permanence tous les mardis et jeudis de 19h15 à 20h15.

                    Venez avec vos problèmes, le BR veille :)
                </p>
            </div>
        );
    }
}

export default Services;