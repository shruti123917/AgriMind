import os
import torch
import torch.nn as nn
import torch.optim as optim

from torchvision import datasets
from torchvision import transforms
from torchvision import models

from torch.utils.data import DataLoader, random_split, Subset


# ======================================
# CONFIG
# ======================================

DATASET_PATH = "ml/data/PlantVillage"
MODEL_DIR = "ml/models"

BATCH_SIZE = 32
EPOCHS = 10
LEARNING_RATE = 0.0001

TRAIN_SPLIT = 0.8

# ======================================
# DEVICE
# ======================================

device = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)

print("\n===================================")
print(" AGRIMIND DISEASE MODEL TRAINING")
print("===================================\n")

print(f"Using Device: {device}")


# ======================================
# TRANSFORMS
# ======================================

train_transform = transforms.Compose([
    transforms.Resize((224, 224)),

    transforms.RandomHorizontalFlip(),

    transforms.RandomRotation(10),

    transforms.ColorJitter(
        brightness=0.2,
        contrast=0.2,
        saturation=0.2
    ),

    transforms.ToTensor(),

    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    ),
])


val_transform = transforms.Compose([
    transforms.Resize((224, 224)),

    transforms.ToTensor(),

    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    ),
])


# ======================================
# LOAD DATASET
# ======================================

full_dataset = datasets.ImageFolder(
    DATASET_PATH,
    transform=train_transform
)

classes = full_dataset.classes

print(f"\nTotal Images  : {len(full_dataset)}")
print(f"Total Classes : {len(classes)}")

print("\nClasses:")

for cls in classes:
    print(f" - {cls}")


# ======================================
# TRAIN / VALIDATION SPLIT
# ======================================

train_size = int(
    TRAIN_SPLIT * len(full_dataset)
)

val_size = len(full_dataset) - train_size

train_dataset, val_dataset = random_split(
    full_dataset,
    [train_size, val_size],
    generator=torch.Generator().manual_seed(42)
)


# ======================================
# VALIDATION DATASET
# ======================================

# random_split keeps the same underlying dataset.
# Therefore create a separate ImageFolder dataset
# with validation transforms.

validation_full_dataset = datasets.ImageFolder(
    DATASET_PATH,
    transform=val_transform
)

val_indices = val_dataset.indices

val_dataset = Subset(
    validation_full_dataset,
    val_indices
)


print("\nDataset Split:")
print(f"Training Images   : {len(train_dataset)}")
print(f"Validation Images : {len(val_dataset)}")


# ======================================
# DATA LOADERS
# ======================================

train_loader = DataLoader(
    train_dataset,
    batch_size=BATCH_SIZE,
    shuffle=True,
    num_workers=0
)

val_loader = DataLoader(
    val_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False,
    num_workers=0
)


# ======================================
# MODEL
# ======================================

print("\nLoading MobileNetV2...")

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
# MODEL SAVE PATHS
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


# ======================================
# TRAINING
# ======================================

print("\n===================================")
print(" TRAINING STARTED")
print("===================================\n")

best_accuracy = 0.0


for epoch in range(EPOCHS):

    # ==================================
    # TRAIN
    # ==================================

    model.train()

    running_loss = 0.0
    correct = 0
    total = 0

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

        _, predicted = torch.max(
            outputs,
            1
        )

        total += labels.size(0)

        correct += (
            predicted == labels
        ).sum().item()

    train_loss = (
        running_loss /
        len(train_loader)
    )

    train_accuracy = (
        100 * correct / total
    )


    # ==================================
    # VALIDATION
    # ==================================

    model.eval()

    val_loss = 0.0
    val_correct = 0
    val_total = 0

    with torch.no_grad():

        for images, labels in val_loader:

            images = images.to(device)
            labels = labels.to(device)

            outputs = model(images)

            loss = criterion(
                outputs,
                labels
            )

            val_loss += loss.item()

            _, predicted = torch.max(
                outputs,
                1
            )

            val_total += labels.size(0)

            val_correct += (
                predicted == labels
            ).sum().item()


    validation_loss = (
        val_loss /
        len(val_loader)
    )

    validation_accuracy = (
        100 * val_correct / val_total
    )


    # ==================================
    # PRINT RESULTS
    # ==================================

    print(
        f"Epoch {epoch + 1}/{EPOCHS} | "
        f"Train Loss: {train_loss:.4f} | "
        f"Train Acc: {train_accuracy:.2f}% | "
        f"Val Loss: {validation_loss:.4f} | "
        f"Val Acc: {validation_accuracy:.2f}%"
    )


    # ==================================
    # SAVE BEST MODEL
    # ==================================

    if validation_accuracy > best_accuracy:

        best_accuracy = validation_accuracy

        torch.save(
            model.state_dict(),
            MODEL_PATH
        )

        torch.save(
            classes,
            CLASSES_PATH
        )

        print(
            f"  ✓ Best model saved "
            f"(Validation Accuracy: "
            f"{best_accuracy:.2f}%)"
        )


# ======================================
# TRAINING COMPLETE
# ======================================

print("\n===================================")
print(" TRAINING COMPLETED")
print("===================================")

print(
    f"\nBest Validation Accuracy: "
    f"{best_accuracy:.2f}%"
)

print(
    f"\nModel File   : {MODEL_PATH}"
)

print(
    f"Classes File : {CLASSES_PATH}"
)

print("\nModel is ready for AgriMind AI.")