import io
import torch

from PIL import Image
from torchvision import models
from torchvision import transforms

MODEL_PATH = "ml/models/plant_disease_model.pth"
CLASSES_PATH = "ml/models/disease_classes.pth"

device = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)

# Load classes
classes = torch.load(
    CLASSES_PATH,
    map_location=device
)

# Load trained model
model = models.mobilenet_v2(weights=None)

num_features = model.classifier[1].in_features

model.classifier[1] = torch.nn.Linear(
    num_features,
    len(classes)
)

model.load_state_dict(
    torch.load(
        MODEL_PATH,
        map_location=device
    )
)

model.to(device)
model.eval()

# Image preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])


def get_recommendation(disease):

    disease = disease.lower()

    if "early_blight" in disease:
        return "Apply fungicide and remove infected leaves."

    if "late_blight" in disease:
        return "Use copper fungicide and improve drainage."

    if "bacterial_spot" in disease:
        return "Remove infected leaves and avoid overhead watering."

    if "leaf_mold" in disease:
        return "Improve air circulation and apply fungicide."

    if "healthy" in disease:
        return "Crop appears healthy."

    return "Consult an agriculture expert."


def detect_disease(image_bytes):

    image = Image.open(
        io.BytesIO(image_bytes)
    ).convert("RGB")

    image = transform(image)

    image = image.unsqueeze(0).to(device)

    with torch.no_grad():

        output = model(image)

        probabilities = torch.softmax(
            output,
            dim=1
        )

        confidence, prediction = torch.max(
            probabilities,
            1
        )

    confidence_score = round(
        confidence.item() * 100,
        2
    )

    # Reject low-confidence predictions
    if confidence_score < 60:
        return {
            "disease": "Unknown Crop/Disease",
            "confidence": confidence_score,
            "recommendation": (
                "Please upload a clearer image or a supported crop leaf "
                "(Tomato/Potato)."
            )
        }

    disease = classes[prediction.item()]

    return {
        "disease": disease,
        "confidence": confidence_score,
        "recommendation": get_recommendation(disease)
    }