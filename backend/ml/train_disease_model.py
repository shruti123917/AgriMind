import os
import torch
import torch.nn as nn
import torch.optim as optim

from torchvision import datasets
from torchvision import transforms
from torchvision import models

from torch.utils.data import DataLoader
from torch.utils.data import random_split
from torch.utils.data import Subset

# ======================================
# CONFIG
# ======================================

DATASET_PATH = "ml/data/PlantVillage"
MODEL_DIR = "ml/models"

BATCH_SIZE = 32
EPOCHS = 3
LEARNING_RATE = 0.001

# ======================================
# TRANSFORMS
# ======================================

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# ======================================
# LOAD DATASET
# ======================================

full_dataset = datasets.ImageFolder(
    DATASET_PATH,
    transform=transform
)

classes = full_dataset.classes

dataset = Subset(
    full_dataset,
    range(min(12000, len(full_dataset)))
)

print("\n===================================")
print(" AGRIMIND DISEASE MODEL TRAINING")
print("===================================\n")

print(f"Training Images : {len(dataset)}")
print(f"Total Classes   : {len(classes)}")

print("\nClasses:")
for cls in classes:
    print(f" - {cls}")

# ======================================
# TRAIN / VALID SPLIT
# ======================================

train_size = int(0.8 * len(dataset))
val_size = len(dataset) - train_size

train_dataset, val_dataset = random_split(
    dataset,
    [train_size, val_size]
)

train_loader = DataLoader(
    train_dataset,
    batch_size=BATCH_SIZE,
    shuffle=True
)

val_loader = DataLoader(
    val_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False
)

# ======================================
# DEVICE
# ======================================

device = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)

print(f"\nUsing Device: {device}")

# ======================================
# MODEL
# ======================================

model = models.mobilenet_v2(
    weights=models.MobileNet_V2_Weights.DEFAULT
)

num_features = model.classifier[1].in_features

model.classifier[1] = nn.Linear(
    num_features,
    len(classes)
)

model = model.to(device)

# ======================================
# LOSS & OPTIMIZER
# ======================================

criterion = nn.CrossEntropyLoss()

optimizer = optim.Adam(
    model.parameters(),
    lr=LEARNING_RATE
)

# ======================================
# TRAINING
# ======================================

print("\nTraining Started...\n")

for epoch in range(EPOCHS):

    model.train()

    running_loss = 0.0

    for images, labels in train_loader:

        images = images.to(device)
        labels = labels.to(device)

        optimizer.zero_grad()

        outputs = model(images)

        loss = criterion(
            outputs,
            labels
        )

        loss.backward()

        optimizer.step()

        running_loss += loss.item()

    avg_loss = running_loss / len(train_loader)

    print(
        f"Epoch {epoch + 1}/{EPOCHS} | "
        f"Loss = {avg_loss:.4f}"
    )

# ======================================
# SAVE MODEL
# ======================================

os.makedirs(
    MODEL_DIR,
    exist_ok=True
)

MODEL_PATH = os.path.join(
    MODEL_DIR,
    "plant_disease_model.pth"
)

CLASSES_PATH = os.path.join(
    MODEL_DIR,
    "disease_classes.pth"
)

torch.save(
    model.state_dict(),
    MODEL_PATH
)

torch.save(
    classes,
    CLASSES_PATH
)

print("\n===================================")
print(" MODEL SAVED SUCCESSFULLY")
print("===================================")

print(f"\nModel File   : {MODEL_PATH}")
print(f"Classes File : {CLASSES_PATH}")