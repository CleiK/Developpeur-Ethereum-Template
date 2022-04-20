import React from 'react';

export default class ContractInteraction extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        let infoString = ["Le owner du contrat peut enregistrer des voteurs.",
            "Les voteurs enregistrés peuvent ajouter des propositions.",
            "Les ajouts de propositions sont terminés.",
            "La session de vote a démarré.",
            "La session de vote est terminé.",
            "Les votes ont étés comptabilisés."];
        return(
            <p>{infoString[this.props.workflowStatus]}</p>
        )
    }
}