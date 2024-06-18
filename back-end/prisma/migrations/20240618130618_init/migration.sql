-- CreateTable
CREATE TABLE `Invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `payerName` VARCHAR(191) NOT NULL,
    `invoiceNumber` VARCHAR(191) NOT NULL,
    `issueDate` DATETIME(3) NOT NULL,
    `billingDate` DATETIME(3) NOT NULL,
    `paymentDate` DATETIME(3) NULL,
    `amount` DOUBLE NOT NULL,
    `invoiceDocument` VARCHAR(191) NOT NULL,
    `invoiceDocumentType` ENUM('PDF') NOT NULL DEFAULT 'PDF',
    `bankSlipDocument` VARCHAR(191) NOT NULL,
    `bankSlipDocumentType` ENUM('PDF') NOT NULL DEFAULT 'PDF',
    `status` ENUM('ISSUED', 'BILLING_DONE', 'PAYMENT_OVERDUE', 'PAYMENT_DONE') NOT NULL DEFAULT 'ISSUED',

    INDEX `invoice_number_idx`(`invoiceNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
