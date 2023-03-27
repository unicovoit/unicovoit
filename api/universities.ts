export interface University {
    id: string,
    name: string,
    country: string,
    format: RegExp,
}

/**
 * List and email format of all supported universities
 */
const universities: University[] = [
    {
        id: 'ubs',
        name: 'Université Bretagne Sud',
        country: 'France',
        format: /^[A-Za-z\-]+\.e\d{7}@etud\.univ-ubs\.fr$/
    }, {
        id: 'rennes1',
        name: 'Université de Rennes 1',
        country: 'France',
        format: /^[A-Za-z\-]+\.[A-Za-z\-]+@etudiant\.univ-rennes1\.fr$/
    }, {
        id: 'rennes2',
        name: 'Université de Rennes 2',
        country: 'France',
        format: /^[A-Za-z\-]+\.[A-Za-z\-]+@etudiant\.univ-rennes2\.fr$/
    }, {
        id: 'insaRennes',
        name: 'INSA Rennes',
        country: 'France',
        format: /^[A-Za-z\-.\d]+@insa-rennes\.fr$/
    }, {
        id: 'univBrest',
        name: 'Université de Bretagne Occidentale',
        country: 'France',
        format: /^[A-Za-z\-]+\.[A-Za-z\-]+@etudiant\.univ-brest\.fr$/
    }, {
        id: 'esiea',
        name: 'ESIEA Paris/Laval',
        country: 'France',
        format: /^[A-Za-z\-]+@et\.esiea\.fr$/
    }, {
        id: 'sorbonneNouvelle',
        name: 'Sorbonne Nouvelle - Paris 3',
        country: 'France',
        format: /^[\dA-Za-z\-.]+@sorbonne-nouvelle\.fr$/
    }, {
        id: 'uef',
        name: 'University of Eastern Finland',
        country: 'Finland',
        format: /^[A-Za-z\-]+@student\.uef\.fi$/
    }
]

export default universities
