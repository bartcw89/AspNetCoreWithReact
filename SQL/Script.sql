CREATE DATABASE AspNetAndReactCourse;
GO

USE AspNetAndReactCourse;
GO

CREATE TABLE dbo.Library(
	Id INT IDENTITY(1, 1) NOT NULL,
	Name NVARCHAR(50) NOT NULL,
	Address NVARCHAR(100) NOT NULL,
	Telephone NVARCHAR(15) NOT NULL,
	CONSTRAINT PK_Library PRIMARY KEY CLUSTERED (Id ASC)
);
GO

INSERT INTO dbo.Library VALUES('LIBRARY OF CONGRESS', 'WASHINGTON D.C., USA', '123456789');
INSERT INTO dbo.Library VALUES('BODLEIAN LIBRARY', 'OXFORD, UNITED KINGDOM', '123456789');
INSERT INTO dbo.Library VALUES('READING ROOM AT THE BRITISH MUSEUM', 'LONDON, ENGLAND', '123456789');
INSERT INTO dbo.Library VALUES('YALE UNIVERSITY BEINECKE', 'NEW HAVEN, CENNECTICUT, USA', '123456789');
INSERT INTO dbo.Library VALUES('VATICAN LIBRARY', 'VATICAN CITY, ROME', '123456789');
INSERT INTO dbo.Library VALUES('NATIONAL LIBRARY OF ST. MARK', 'VENICE, ITALY', '123456789');
INSERT INTO dbo.Library VALUES('BOSTON PUBLIC LIBRARY', 'BOSTON, MASSACHUSETTS, USA', '123456789');
INSERT INTO dbo.Library VALUES('LIBRARY OF PARLIAMENT', 'OXFORD, OTTAWA, CANADA', '123456789');
INSERT INTO dbo.Library VALUES('NEW YORK PUBLIC LIBRARY', 'NEW YORK, NEW YORK, USA', '123456789');
INSERT INTO dbo.Library VALUES('THOMAS FISHER RARE BOOK LIBRARY', 'TORONTO, CANADA', '123456789');