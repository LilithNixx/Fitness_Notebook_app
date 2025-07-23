def obtener_grupo_muscular(ejercicio: str) -> str:
    ejercicio = ejercicio.lower()
    grupos = {
        "Piernas": [
            "sentadillas",
            "prensa",
            "prensa a una pierna",
            "zancadas",
            "curl de pierna",
            "extensión de pierna",
            "extensiones de piernas a una pierna",
            "peso muerto rumano",
            "elevación de talones",
        ],
        "Pecho": [
            "press de banca",
            "press inclinado",
            "aperturas con mancuernas",
            "fondos en paralelas",
            "press con máquina",
        ],
        "Brazos": [
            "curl de bíceps con barra",
            "curl martillo",
            "extensión de tríceps en polea",
            "fondos de tríceps",
            "curl de bíceps con mancuernas",
        ],
        "Hombros": [
            "press militar",
            "elevaciones laterales",
            "elevaciones frontales",
            "pájaros para deltoides posteriores",
            "remo al mentón",
        ],
        "Espalda": [
            "dominadas",
            "remo con barra",
            "jalón al pecho",
            "peso muerto convencional",
            "remo en polea baja",
            "pull-over con mancuerna",
            "jalón tras nuca",
            "remo en máquina",
        ],
        "Glúteos": [
            "puente de glúteos",
            "patada de glúteo en polea",
            "hip thrust",
            "sentadilla sumo",
            "patada de glúteos",
            "abducción de cadera",
        ],
    }
    for grupo, lista in grupos.items():
        if any(ejercicio in e for e in lista):
            return grupo
    return "Otro"
